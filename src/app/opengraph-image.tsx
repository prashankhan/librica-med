import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "linear-gradient(140deg, #eef6ff 0%, #dcebff 45%, #c7e0ff 100%)",
          color: "#001f40",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              height: "66px",
              width: "66px",
              borderRadius: "9999px",
              background: "#037eff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            L
          </div>
          <div style={{ fontSize: "52px", fontWeight: 700, letterSpacing: "-1px" }}>
            Librica Med
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-1.2px",
              maxWidth: "980px",
            }}
          >
            Medical Books in Sri Lanka
          </div>
          <div style={{ fontSize: "32px", color: "#225d9d", fontWeight: 500 }}>
            Islandwide delivery and WhatsApp-assisted ordering
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "28px",
            color: "#2e6ba9",
            fontWeight: 600,
          }}
        >
          <div>libricamed.lk</div>
          <div style={{ color: "#037eff" }}>Trusted by Sri Lankan medical students</div>
        </div>
      </div>
    ),
    size,
  );
}
