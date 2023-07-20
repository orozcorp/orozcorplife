/* eslint-disable react/no-unescaped-entities */
import { header } from "@/components/smallComponents/TextComponents";
import { getData } from "@/lib/helpers/getData";
import Timeline from "@/components/smallComponents/Timeline";
import Image from "next/image";
import { rgbDataURL } from "@/lib/helpers/blur";

const QUERY = `
  query GetResume {
    getResume {
      active
      company
      logo
      dateEnded
      dateStarted
      _id
      activity {
        activity
        activityDetail
        dateEnded
        dateStarted
        position
      }
    }
  }
`;

export default async function Resume() {
  const data = await getData({ query: QUERY });
  const resume = data?.getResume || [];
  return (
    <div
      className="my-10 flex flex-col flex-nowrap justify-center items-center w-full "
      id="resume"
    >
      <div className="w-full flex flex-row flex-wrap items-center">
        <Image
          src="https://orozcorp.s3.us-east-2.amazonaws.com/Personal/IMG_2776.jpeg"
          alt="Eduardo Orozco Mendoza"
          width={100}
          height={190}
          className="rounded-full"
          blurDataURL={rgbDataURL(0, 0, 0)}
          loading="lazy"
        />

        <div className="flex flex-col flex-nowrap flex-1 ml-8">
          <h2 className={`${header({ size: "h1", color: "primary" })}  `}>
            RESUME
          </h2>
          <p className="my-4">
            I am Eduardo Orozco, a seasoned Full Stack Developer, Entrepreneur,
            and Chief Operating Officer with a solid foundation in strategic
            thinking and innovative problem-solving. Armed with a proven track
            record in operational leadership and technical expertise, I bring a
            robust understanding of operations management, full-stack
            development, data analytics, project management, and business
            development.
          </p>
        </div>
      </div>
      <div className="mb-20 self-start ">
        <p className="my-4">
          I hold a Bachelor's degree in Entrepreneurship from ITESM CSF. My
          technical skills are multifaceted. I am proficient in JavaScript,
          HTML, CSS, and experienced in MongoDB, enabling me to build and
          maintain numerous successful web applications and manage
          high-performance data systems.
        </p>
        <p className="my-4">
          My expertise extends to using React JS, Next JS, Meteor JS, Node.js,
          Apollo, and GraphQL to build responsive, scalable, and performant
          applications. Additionally, I proficiently utilize Git for version
          control, Stripe for payments, and Vimeo integration for video
          handling, ensuring seamless user experiences across devices.
        </p>
        <p className="my-4">
          In my tenure as Senior Full Stack Developer & Chief Operating Officer
          at Ormen World Wide, I developed a custom-built ERP system, improved
          operational efficiency, and drove significant business growth. As a
          Co-founder of Club AC Adiestramiento Canino and a Senior Full Stack
          Developer at Gym Juice Yoga and Kumbhaka Coyoacan, I've exhibited my
          capability in building comprehensive ERP systems, managing
          memberships, tracking attendance, monitoring progress, and handling
          payments.
        </p>{" "}
        <p className="my-4">
          {" "}
          My ability to integrate advanced systems like Vimeo for online events
          and Stripe for recurring payments, and transitioning projects to
          advanced frameworks demonstrates my dedication to continuous learning
          and application of advanced development skills. My accomplishments
          span a multitude of projects that have made significant contributions
          to businesses across the consumer services sector.
        </p>
      </div>
      {resume?.map((resume) => (
        <Timeline key={resume._id} timeline={resume} />
      ))}
    </div>
  );
}
