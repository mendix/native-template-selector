import { Decoration, Diff, Hunk, parseDiff } from "react-diff-view";
import styled from "styled-components";
import { useState } from "react";
import { Space } from "./components";

export function DiffView({ diffText }) {
  const files = parseDiff(diffText).filter(
    (item) =>
      ![item.newPath, item.oldPath].some((path) =>
        new RegExp("(-|.)lock|.github").test(path ?? "")
      ) && Boolean(item.newPath || item.oldPath)
  );

  return (
    <>
      {files.map((data) => (
        <DiffContainer
          key={[
            data.newPath || data.oldPath,
            data.oldRevision,
            data.newRevision,
          ].join("-")}
          data={data}
        />
      ))}
    </>
  );
}

const StyledDiff = styled(Diff)`
  .diff-gutter-col {
    width: 2em;
  }

  td.diff-gutter {
    color: rgba(27, 31, 35, 0.3);
    padding: 0;
    text-align: center;
    font-size: 0.85em;
    vertical-align: middle;
    cursor: auto;
  }

  td.diff-gutter:hover {
    cursor: pointer;
    color: rgba(27, 31, 35, 0.6);
  }

  td.diff-code {
    font-size: 0.95em;
    color: #24292e;
  }

  td.diff-gutter-omit:before {
    width: 0;
  }
`;

const DiffContainer = ({ data }) => {
  const [isVisible, setVisibility] = useState(false);

  return (
    <>
      <CollapsibleTitle onClick={() => setVisibility(!isVisible)} isVisible>
        <span>{isVisible ? "=" : "#"}</span>
        <Space width="16" />
        <FileName
          oldPath={data.oldPath}
          newPath={data.newPath}
          type={data.type}
        />
        <Space width="16" />
        <FileStatus type={data.type} />
      </CollapsibleTitle>
      {isVisible && (
        <DiffCodeWrapper>
          <StyledDiff
            key={data.oldRevision + "-" + data.newRevision}
            viewType="split"
            diffType={data.type}
            hunks={data.hunks}
          >
            {(hunks) =>
              hunks.map((hunk) => {
                return (
                  <>
                    <Decoration key={"decoration-" + hunk.content}>
                      {hunk.content}
                    </Decoration>
                    <Hunk key={hunk.content} hunk={hunk} />
                  </>
                );
              })
            }
          </StyledDiff>
        </DiffCodeWrapper>
      )}
    </>
  );
};

const DiffCodeWrapper = styled.div`
  background: white;
  margin-bottom: 1em;
  padding: 1em 0.25em;
  border: 1px solid whitesmoke;
  border-radius: 0 0 4px 4px;
`;

const CollapsibleTitle = styled.button`
  background: whitesmoke;
  color: black;
  display: flex;
  cursor: pointer;
  align-items: center;
  font-size: 1em;
  min-height: 48px;
  width: 100%;
  margin-top: 1em;
  padding: 0.25em 1em;
  text-align: left;
  border: 2px solid transparent;
  border-radius: ${(props) => (props.isVisible ? "4px 4px 0 0" : "4px")};

  :hover {
    background-color: lightgray;
  }
`;

const FileNameTitle = styled.span`
  font-weight: bold;
  display: flex;
`;

const FileName = ({ oldPath, newPath, type }) => {
  if (type === "delete") {
    return <FileNameTitle>{oldPath}</FileNameTitle>;
  }

  if (oldPath !== newPath && type !== "add") {
    return (
      <FileNameTitle>
        {oldPath} <span>></span> {newPath}
        <Space width="8" />
        <Tag color="lightgrey">RENAMED</Tag>
      </FileNameTitle>
    );
  }

  return <FileNameTitle>{newPath}</FileNameTitle>;
};

const Tag = styled.span`
  display: inline-block;
  background-color: ${(props) => props.color};
  color: white;
  font-size: 0.8em;
  padding: 0.2em 0.5em;
  border-radius: 4px;
`;

const FileStatus = ({ type }) => {
  const colors = {
    add: "blue",
    modify: "green",
    delete: "red",
    rename: "orange",
  };

  const labels = {
    add: "ADDED",
    modify: "MODIFIED",
    delete: "DELETED",
    rename: "RENAMED",
  };

  return <Tag color={colors[type]}>{labels[type]}</Tag>;
};
