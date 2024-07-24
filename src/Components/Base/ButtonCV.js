import React from 'react';
import { FloatButton } from 'antd';
const handleDownloadAndRedirect = () => {
    // Descargar el archivo PDF
    const link = document.createElement('a');
    link.href = '/DevJourney/build/CV_jose_miguel_santos_palomera.pdf';
    link.download = 'CV_jose_miguel_santos_palomera.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
const ButtonCV = () => <FloatButton onClick={handleDownloadAndRedirect} tooltip={<div>CV</div>} />;
export default ButtonCV;