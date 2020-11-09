import { SyncLoader } from "react-spinners";
import React from "react";

export default function LoadingScreen() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        width: "100%",
        textAlign: "center",
      }}
    >
      <div className="mx-auto" style={{ marginTop: "300px" }}>
        <SyncLoader size={10} color={"white"} loading={true} />
      </div>
    </div>
  );
}
