import React from 'react';
import { FloatButton } from 'antd';

const basePath = process.env.PUBLIC_URL || '';

const handleDownloadAndRedirect = () => {
  const link = document.createElement('a');
  link.href = `${basePath}/CV_jose_miguel_santos_palomera.pdf`;
  link.download = 'CV_jose_miguel_santos_palomera.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ButtonCV = () => (
  <FloatButton
    className="base-float-cv"
    onClick={handleDownloadAndRedirect}
    tooltip={<div>CV</div>}
  />
);
export default ButtonCV;