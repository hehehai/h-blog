import { GetServerSideProps } from "next";
import Container from "~/components/Container";
import PhotoItem from "~/components/PhotoItem";
import { getAtlas } from "~/utils/photo";
import { Atlas } from "~/types/photo";

export const config = {
  runtime: 'experimental-edge',
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let atlas: Atlas[] = [];

  try {
    atlas = await getAtlas();
  } catch (err) {
    // fetch err
  }

  return { props: { atlas } };
};

export default function Photos(props: { atlas: Atlas[] }) {
  const { atlas = [] } = props;

  return (
    <Container>
      <div className="space-y-10">
        {atlas.map((item: Atlas, idx: number) => (
          <PhotoItem key={idx} {...item} />
        ))}
      </div>
    </Container>
  );
}
