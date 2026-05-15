import React from "react";

export const Home = () => {
  const version = process.env.BUILD_DATE;

  return (
    <div style={{ marginTop: '40px', textAlign: 'center' }}>
      <p>Wybierz mikro-frontend z menu powyżej.</p>
      <p>Latest Build Date: {version}</p>
    </div>
  );
}
