import { useState, useCallback, useEffect } from "react";
import Container from "../components/Container";
import PhotoItem from "../components/PhotoItem";
import { Atlas } from "./interface/photo";

export default function Photos() {
  const [loading, setLoading] = useState(false);
  const [atlas, setAtlas] = useState<Atlas[]>([]);

  const getPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/photos?page=1`);
      if (res.status === 200) {
        const body = await res.json();
        setAtlas(body);
      }
    } catch (err) {
      // empty
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <Container>
      <div className="space-y-10">
        {atlas.map((item: Atlas, idx: number) => (
          <PhotoItem key={idx} {...item} />
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </Container>
  );
}
