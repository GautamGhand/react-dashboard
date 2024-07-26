import { useLocation } from "react-router-dom";
import Layout from "./Layout";

const ConditionalLayout = ({ children }) => {
  const location = useLocation();
  const noLayoutPaths = ["/","/404"];

  const shouldRenderLayout = !noLayoutPaths.includes(location.pathname);

  return shouldRenderLayout ? <Layout>{children}</Layout> : <>{children}</>;
};

export default ConditionalLayout;
