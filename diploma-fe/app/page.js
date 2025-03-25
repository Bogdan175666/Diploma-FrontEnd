"use client"

import "./home.css"
import {HomeImage, HomeMarketing} from "@/components/server-side-components";
import {useRouter} from "next/navigation";
export default function Home() {
    const router = useRouter();
    const handleCreateADeveloper = () => {
        router.push('/create-developer')
    }

    const handleCreateAClient = () => {
        router.push('/create-client')
    }

  return (
      <div>
          <main className="first-main">
              <div className="home-header">
                  <button onClick={handleCreateADeveloper} className="home-btn first-btn">Become a developer</button>
                  <button onClick={handleCreateAClient} className="home-btn client-btn">Become a client</button>
                  <button className="home-btn">Sign Up</button>
              </div>

              <div className="title-wrapper">
                  <div>
                      <h1 className="home-title">Are you looking for Freelancers?</h1>
                      <h3 className="home-subtitle">Hire Great Freelancers, Fast. HelpMe helps you hire elite freelancers at a moment's notice</h3>
                  </div>

                  <HomeImage/>
              </div>

          </main>

          <div className="home-marketing">
            <HomeMarketing
                title="Create Account"
                subtitle="First you have to create a account  here"/>
              <HomeMarketing
                  title="Search work "
                  subtitle="Search the best freelance work here"/>
              <HomeMarketing
                  title="Save and apply"
                  subtitle="Apply or save and start your work"/>
          </div>

      </div>
  );
}
