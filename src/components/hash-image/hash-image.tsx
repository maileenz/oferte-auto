import { type FC, useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";

export const HashImage: FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(!loaded);
  }, []);

  return (
    <Blurhash
      hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
      width={400}
      height={300}
      resolutionX={32}
      resolutionY={32}
      punch={1}
    />
  );
};
