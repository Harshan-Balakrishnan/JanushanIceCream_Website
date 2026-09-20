import { ImageResponse } from "next/og";

export const alt = "Janushan Ice Cream — A Scoop of Happiness";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"70px",color:"white",background:"linear-gradient(135deg, #020713 0%, #071b3d 58%, #0626a5 100%)",fontFamily:"sans-serif"}}>
      <div style={{fontSize:26,letterSpacing:8,color:"#f3be53",marginBottom:24}}>JANUSHAN ICE CREAM · SINCE 2004</div>
      <div style={{fontSize:82,fontWeight:800,lineHeight:1.02}}>A Scoop of Happiness.</div>
      <div style={{fontSize:30,marginTop:28,color:"#ffe4a2"}}>Ice cream · Cones · Flavours · Vavuniya</div>
    </div>,
    { ...size }
  );
}
