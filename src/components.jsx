import styled from "styled-components";
import React from "react";

export const Space = styled.div`
  min-width: ${(props) => (props.width || 0) + "px"};
  min-height: ${(props) => (props.height || 0) + "px"};
`;

export const HeaderText = styled.h2`
  font-size: xxx-large;
  font-weight: lighter;
`;

export const StatusText = styled.div`
  font-size: 1em;
  display: block;
  color: ${(props) => props.color};
`;

export const LoadingView = () => <p>Loading...</p>;

export const ErrorStatusText = (props) => <StatusText {...props} color="darkred" />;
