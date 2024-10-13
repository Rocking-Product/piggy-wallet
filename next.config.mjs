/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: false, // Desactivar minificación de SWC
    typescript: {
        ignoreBuildErrors: true, // Omitir errores de validación de tipos en el build
      },
    
};

export default nextConfig;
