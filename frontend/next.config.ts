import type { NextConfig } from "next";
import loadWichEnv from "./src/utils/load-wich-env";

loadWichEnv();

console.log(`
  |--------------------------------------------------------------------------------------------------------
  |                                                                                                        
  |  NODE_ENV:                ${process.env.ENV_USADO}                                                                                                     
  |                                                                                                        
  |--------------------------------------------------------------------------------------------------------
  `);


const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
