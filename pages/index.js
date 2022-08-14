// import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
const url = "https://react-http-f0957-default-rtdb.firebaseio.com/meetups.json";
import Head from "next/head";
const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetup App</title>
        <meta
          name="description"
          content="Brows a huge list of highly active React Meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// Data fetching for pre-rendering
// instead of using useEffect, and storing the data in a state
export async function getStaticProps() {
  // fetch/read data from API
  // we must return an object as following
  const meetups = await fetch(url);
  const data = await meetups.json();
  const AllData = Object.keys(data).map((key) => {
    return { id: key, ...data[key] };
  });

  return {
    props: {
      meetups: AllData,
    },
    // number of seconds which NextJS will wait until it rebuild the page
    // to ensure that the data are uptodate
    revalidate: 1,
  };
}

export default HomePage;
