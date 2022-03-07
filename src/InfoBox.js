import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";
export default function InfoBox({
  title,
  cases,
  isRed,
  active,
  total,
  ...props
}) {
  return (
    <div>
      <Card
        onClick={props.onClick}
        className={`infoBox ${active && "infoBox--selected"}
      ${isRed && "infoBox--red"} `}
      >
        <CardContent>
          {/* Title*/}

          <Typography className="infoBox_title" color="textSecondary">
            {title}
          </Typography>

          {/* no of cases*/}
          <h2 className={`infoBox_cases ${!isRed && "infoBox_cases--green"}`}>
            {cases}
          </h2>
          <Typography className="infoBox_total" color="textSecondary">
            {total}Total
          </Typography>
          {/* total*/}
        </CardContent>
      </Card>
    </div>
  );
}
