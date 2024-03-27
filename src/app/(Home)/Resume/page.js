/* eslint-disable react/no-unescaped-entities */
import { getResume } from "../actions/home";
import Timeline from "@/components/smallComponents/Timeline";
import Image from "next/image";
import { rgbDataURL } from "@/lib/helpers/blur";

export default async function Resume() {
  const resume = (await getResume()) || [];
  return (
    <div
      className="py-10 flex flex-col flex-nowrap justify-center items-center"
      id="resume"
    >
      <div className="w-full flex flex-row flex-wrap items-center"></div>
      <div className=" p-4 bg-white rounded-lg">
        <section className="text-center mb-12 flex flex-row flex-wrap gap-4 justify-start items-center">
          <Image
            src="https://orozcorp.s3.us-east-2.amazonaws.com/orozcorp/IMG_0054-testsmall.jpg"
            alt="Eduardo Orozco Mendoza"
            width={100}
            height={153}
            className="rounded-full"
            blurDataURL={rgbDataURL(0, 0, 0)}
            loading="lazy"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Eduardo Orozco</h1>
            <p className="text-xl text-gray-600">
              SEASONED ENTREPRENEUR | SEASONED FULLSTACK DEVELOPER
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b-2 pb-2">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="mt-4 text-gray-700">
            As a strategic thinker and tech-savvy leader, Eduardo Orozco brings
            a wealth of experience as a senior full stack developer and COO.
            With a solid grasp of both operational leadership and hands-on
            coding, Eduardo has a track record of spearheading robust technical
            solutions and driving significant business growth. Adept in a
            multitude of languages and frameworks, from JavaScript to GraphQL,
            his work has consistently delivered seamless, scalable, and
            efficient systems that enhance user experiences and streamline
            operations. His tenure at Ormen World Wide, Club AC Adiestramiento
            Canino, Gym Juice Yoga, and Kumbhaka Coyoacan showcases a commitment
            to innovation and excellence, with a keen focus on building
            comprehensive, responsive, and performance-driven applications.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b-2 pb-2">
            AREAS OF EXPERTISE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <ul className="list-disc list-inside text-gray-700">
              <li>FULL STACK DEVELOPMENT</li>
              <li>OPERATIONS MANAGEMENT</li>
              <li>BUSINESS STRATEGY AND GROWTH</li>
              <li>TECHNICAL LEADERSHIP</li>
              <li>JAVASCRIPT PROGRAMMING</li>
              <li>FRONT-END DEVELOPMENT WITH REACT JS AND NEXT JS</li>
            </ul>
            <ul className="list-disc list-inside text-gray-700">
              <li>BACK-END DEVELOPMENT WITH NODE.JS</li>
              <li>DATABASE MANAGEMENT WITH MONGODB</li>
              <li>REAL-TIME DATA HANDLING WITH METEOR JS</li>
              <li>API DEVELOPMENT WITH APOLLO AND GRAPHQL</li>
              <li>PROJECT MANAGEMENT</li>
              <li>ENTREPRENEURSHIP</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b-2 pb-2">
            CAREER HIGHLIGHTS
          </h2>
          <div className="mt-4 text-gray-700">
            <p>
              Revolutionary e-commerce platform development: Eduardo pioneered
              the development of an innovative e-commerce platform at Ormen
              World Wide, leveraging cutting-edge technologies like React JS and
              GraphQL to ensure a seamless, high- performance online shopping
              experience. This platform set new standards for user engagement,
              leading to a remarkable 150% increase in customer retention and a
              75% increase in sales within the first year of launch.
            </p>
            <p className="mt-2">
              Operational excellence and team leadership: as the COO of Club AC
              Adiestramiento Canino, Eduardo orchestrated a complete digital
              transformation of the company's operational infrastructure. His
              strategic vision led to the implementation of scalable full-stack
              solutions that optimized workflow efficiency by 200%. Eduardo's
              leadership was instrumental in fostering a culture of innovation,
              enabling the company to expand its services nationally.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b-2 pb-2">EDUCATION</h2>
          <p className="mt-4 text-gray-700">
            ITESM CSF - Ciudad de Mexico — Bachelor in Entrepreneurship - Aug
            2006 - Jan 2011
          </p>
          <p className="mt-2 text-gray-700">
            The American School Foundation - Aug 2003 - Jun 2006 - High School
            diploma
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b-2 pb-2">COURSES</h2>
          <p className="mt-4 text-gray-700">
            Graph Developer - Associate, Apollo GraphQL. March 2022
          </p>
          <p className="mt-2 text-gray-700">
            EDX Supply Chain program - MIT EDX. August 2016 - April 2017
          </p>
        </section>
      </div>
      {resume?.map((resume) => (
        <Timeline key={resume._id} timeline={resume} />
      ))}
    </div>
  );
}
