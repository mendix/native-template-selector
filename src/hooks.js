import semver from "semver";
import { useCallback, useEffect, useState } from "react";

const MENDIX_TEMPLATE_REPO = "mendix/native-template";
const MENDIX_RAW_BASE_URL = `https://raw.githubusercontent.com/${MENDIX_TEMPLATE_REPO}/master`;
const MENDIX_VERSIONS_URL = `${MENDIX_RAW_BASE_URL}/mendix_version.json`;
const MENDIX_RELEASES_URL = `${MENDIX_RAW_BASE_URL}/.mx/releases_list.json`;
const MENDIX_TEMPLATE_DIFF_URL = `https://raw.githubusercontent.com/mendix/native-template-diffs/diffs/diffs`;

export const RequestState = Object.freeze({
  loading: 1,
  complete: 2,
});

export function useMendixTemplateInfo() {
  const [requestState, setRequestState] = useState(RequestState.loading);
  const [requestError, setRequestError] = useState();
  const [versions, setVersions] = useState();
  const [releases, setReleases] = useState();

  useEffect(() => {
    setRequestError(undefined);
    setRequestState(RequestState.loading);
    Promise.all(
      [fetch(MENDIX_VERSIONS_URL), fetch(MENDIX_RELEASES_URL)].map((p) =>
        p.then((res) => res.json())
      )
    )
      .then(([versions, releases]) => {
        setVersions(versions);

        releases.sort((a, b) => semver.compare(b.tag_name, a.tag_name));
        setReleases(releases);
      })
      .catch(([versionsError, releasesError]) =>
        setRequestError(versionsError ?? releasesError)
      )
      .finally(() => setRequestState(RequestState.complete));
  }, []);

  return {
    state: requestState,
    error: requestError,
    versions,
    releases,
  };
}

export function useMendixTemplateDiff({ from, to }) {
  const [requestState, setRequestState] = useState(RequestState.loading);
  const [requestError, setRequestError] = useState();
  const [templateDiff, setTemplateDiff] = useState();

  useEffect(() => {
    setRequestError(undefined);
    setRequestState(RequestState.loading);
    fetch(`${MENDIX_TEMPLATE_DIFF_URL}/${from}..${to}.diff`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(`Missing diff files for ${from} and ${to}`);
          }
          throw new Error(res.statusText);
        }
        return res.text();
      })
      .then((diff) => setTemplateDiff(diff))
      .catch((error) => setRequestError(error.message || error.toString()))
      .finally(() => setRequestState(RequestState.complete));
  }, [from, to]);

  return {
    state: requestState,
    error: requestError,
    templateDiff,
  };
}

export function useQueryTemplateRelease(mendixVersions, mendixReleases) {
  return useCallback(
    (mendixVersion) => {
      const parsedVersion = semver.parse(mendixVersion, { loose: true });
      if (!parsedVersion) {
        const splitVersion = mendixVersion.split(".");
        const exampleVersion = ["x", "x", "x"]
          .map((value, i) => splitVersion[i] ?? value)
          .join(".");
        return {
          error: `The supplied mendix version is not valid. It needs to be a valid Semantic Version. eg ${exampleVersion}`,
        };
      }

      const mendixVersionRange = Object.keys(
        mendixVersions
      ).find((templateVersion) =>
        semver.satisfies(semver.coerce(mendixVersion), templateVersion)
      );
      if (!mendixVersionRange) {
        return {
          error: `Could not determine a proper mendix version range for ${mendixVersion}`,
        };
      }

      const { min, max } = mendixVersions[mendixVersionRange];
      const versions = mendixReleases.map((release) => release.tag_name);
      const templateVersion = semver.maxSatisfying(versions, `${min} - ${max}`);
      if (!templateVersion) {
        return {
          error: `Could not determine a proper template version when ${mendixVersionRange} using ${mendixVersion}`,
        };
      }

      return { result: mendixReleases[versions.indexOf(templateVersion)] };
    },
    [mendixVersions, mendixReleases]
  );
}
