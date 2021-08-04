import React, { useState } from "react";
import { RequestState, useMendixTemplateDiff } from "./hooks";
import { DiffView } from "./DiffView";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Routes } from "./Routes";
import styled from "styled-components";
import { useTemplateData } from "./TemplateDataProvider";
import { ErrorStatusText, HeaderText, LoadingView, Space } from "./components";

export function ComparePage() {
  const { releases: mendixReleases } = useTemplateData();
  const [fromOption, setFromOption] = useState(null);
  const [toOption, setToOption] = useState(null);

  let options = mendixReleases.map((release) => ({
    value: release.tag_name,
    label: release.tag_name,
  }));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "75%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <HeaderText style={{ flexGrow: 1 }}>
            Compare Template Versions
          </HeaderText>
          <Link to={Routes.home}>Home</Link>
        </div>
        <div style={{ display: "flex" }}>
          <StyleSelect
            value={fromOption}
            onChange={setFromOption}
            options={options.filter(({ value }) => value !== toOption)}
          />
          <Space width="8" />
          <StyleSelect
            value={toOption}
            onChange={setToOption}
            options={options.filter(({ value }) => value !== fromOption)}
          />
        </div>
        <Space height="24" />
        {fromOption && toOption && fromOption.value !== toOption.value && (
          <QueryView from={fromOption.value} to={toOption.value} />
        )}
        <Space height="64" />
      </div>
    </div>
  );
}

function QueryView({ from, to }) {
  const { state, error, templateDiff } = useMendixTemplateDiff({
    from,
    to,
  });

  return (
    <>
      {state === RequestState.loading && <LoadingView />}
      {state === RequestState.complete && error && (
        <ErrorStatusText>{error}</ErrorStatusText>
      )}
      {state === RequestState.complete && !error && (
        <DiffView diffText={templateDiff} />
      )}
    </>
  );
}

const StyleSelect = styled(Select)`
  flex-grow: 1;
  font-size: 1.125em;

  > div {
    min-height: 48px;
  }
`;
