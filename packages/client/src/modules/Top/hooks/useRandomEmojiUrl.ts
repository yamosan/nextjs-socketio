import { useCallback, useEffect, useMemo, useState } from "react";

type Data = { [key: string]: string };

const getRandomEmoji = (data: Data) => {
  const names = Object.keys(data);
  const emojiName = names[Math.floor(Math.random() * names.length)];
  return { name: emojiName, src: data[emojiName] };
};

export const useRandomEmojiUrl = () => {
  const [data, setData] = useState<Data>(null);
  const [loading, setLoading] = useState(true);
  const [emoji, setEmoji] = useState<{
    name: string;
    src: string;
  }>(null);

  useEffect(() => {
    (async () => {
      const data = await fetch(`https://api.github.com/emojis`);
      const json = await data.json();
      setData(json);
      setEmoji(getRandomEmoji(json));
      setLoading(false);
    })();
  }, []);

  const update = useCallback(() => {
    if (data !== null) {
      setEmoji(getRandomEmoji(data));
    }
  }, [data]);

  return { loading, emoji, update };
};
