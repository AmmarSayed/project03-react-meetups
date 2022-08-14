// import { useRouter } from "next/router";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import Head from "next/head";
const index = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetails {...props.meetupData} />
    </>
  );
};

export async function getStaticPaths() {
  // fetch the all data from some database
  const url = `https://react-http-f0957-default-rtdb.firebaseio.com/meetups.json`;
  const res = await fetch(url);
  const data = await res.json();

  // extract the ids from the returned data
  const ids = [...Object.keys(data)];

  // generate list of id params
  const paths = ids.map((id) => ({
    params: {
      meetupId: id,
    },
  }));

  // return  the paths array
  return {
    fallback: false,
    paths: paths,
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup
  const meetupId = context.params.meetupId;
  const url = `https://react-http-f0957-default-rtdb.firebaseio.com/meetups/${meetupId}.json`;
  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      meetupData: { id: meetupId, ...data },
    },
  };
}

export default index;
