import React, { useEffect } from "react";
import { useQueryTemplateRelease } from "./hooks";
import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Routes } from "./Routes";
import { useTemplateData } from "./TemplateDataProvider";
import { HeaderText, StatusText, Space, ErrorStatusText } from "./components";

export function MainPage() {
  const inputRef = useRef();
  const [mendixVersion, setMendixVersion] = useState();
  const [validationMessage, setValidationMessage] = useState();

  const onQuery = useCallback(() => {
    setValidationMessage(undefined);

    const mendixVersion = inputRef.current.value;
    if (!mendixVersion) {
      setValidationMessage("Needs a value");
      return;
    }

    setMendixVersion(mendixVersion);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <HeaderText>Input Mendix Version</HeaderText>
        <StyledInput ref={inputRef} onChange={onQuery} placeholder="eg 9.1.0" />
        {validationMessage && (
          <StatusText color="darkorange">{validationMessage}</StatusText>
        )}
        {mendixVersion && <QueryView mendixVersion={mendixVersion} />}
        <Space height="24" />
        <Link to={Routes.compare}>Compare Template Versions</Link>
      </div>
    </div>
  );
}

const QueryView = ({ mendixVersion }) => {
  const [templateRelease, setTemplateRelease] = useState();
  const [queryError, setQueryError] = useState();
  const { versions, releases } = useTemplateData();
  const queryAction = useQueryTemplateRelease(versions, releases);

  useEffect(() => {
    setQueryError(undefined);
    setTemplateRelease(undefined);

    const { error, result } = queryAction(mendixVersion);
    if (error) {
      setQueryError(error);
      return;
    }

    setTemplateRelease(result);
  }, [queryAction, mendixVersion]);

  return (
    <>
      {templateRelease && (
        <>
          <SuccessText>{templateRelease.tag_name}</SuccessText>
          <Space height="4" />
          <span style={{ color: "gray" }}>recommended template version</span>
        </>
      )}
      {queryError && <ErrorStatusText>{queryError}</ErrorStatusText>}
    </>
  );
};

const SuccessText = styled.div`
  font-size: 3em;
  display: block;
  color: forestgreen;
`;

const StyledInput = styled.input`
  font-size: 1.25em;
  padding: 0.5em;
  width: -webkit-fill-available;
  text-align: center;
  border: 1px solid lightgray;
  border-radius: 4px;
  flex-grow: 1;

  ::placeholder {
    color: lightgray;
  }
`;
