import { ImgBox } from "@/components/common/admin/reuseable";
import { Button, ScrollArea } from "@/components/ui";
import { contractService, processItem } from "@/dummy-data";
import FavIcon from "@/icon/admin/favIcon";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ContractView() {
  return (
    <div>
      <div className="flex flex-col  md:flex-row md:items-center space-y-4 md:space-y-0 justify-between mt-5">
        <div>
          <h1 className="font-semibold text-xl lg:text-3xl">
            Your Business, Elevated- All-in-One Digital Presence & PR Package
          </h1>
          <h3 className="text-blacks mt-1">
            We create your professional video, write your press release, and
            launch your brand
          </h3>
        </div>
        <Button className="rounded-full" variant="primary">
          Pay now <ArrowRight />
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 mt-10">
        <ImgBox
          className="w-full h-[330px] hidden lg:block"
          src="/images/contract/contract_l.png"
          alt="contract/left"
        />
        <ImgBox
          className="w-full h-[330px]"
          src="/images/contract/contract_r.png"
          alt="contract/right"
        />
      </div>
      {/* ==  Our Services ----==*/}
      <div className="mt-10 lg:mt-16">
        <h2 className="text-2xl lg:text-3xl text-center font-bold pb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contractService?.map((service: any, idx: any) => (
            <div key={idx} className="bg-white p-6 rounded-xl space-y-2">
              <div className="bg-[#F6F6F6] mx-auto rounded-full p-3 w-fit h-fit">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={40}
                  height={30}
                />
              </div>

              <h3 className="text-xl font-semibold text-center">
                {service.title}
              </h3>
              <p className="text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* == Easy 3 step process == */}
      <div className="my-10 lg:my-16">
        <h2 className="text-2xl lg:text-3xl text-center font-bold pb-8">
          Easy 3 step process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {processItem?.map((service: any, idx: any) => (
            <div key={idx} className="rounded-xl space-y-2">
              <Image
                src={service.icon}
                alt={service.title}
                width={service.width}
                style={{
                  height: "300px",
                }}
              />

              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* == Service agreement == */}
      <div className="my-10 lg:my-16">
        <h2 className="text-2xl lg:text-3xl text-center font-bold pb-8">
          Service agreement
        </h2>

        <div className="space-y-10">
          <div className="bg-white p-3  rounded-xl">
            <ScrollArea className="h-[500px] p-4 w-full">
              <div>
                MyTsv is a comprehensive platform designed to connect users with
                trusted local services, offering a vast directory of businesses
                across multiple industries, such as home improvement, legal
                services, financial planning, and more. The platform aims to
                provide users with a seamless experience to find high-quality
                service providers based on detailed profiles and user-generated
                reviews. This makes it easier for users to access services they
                trust, enhancing their decision-making process by providing
                transparent and up-to-date information about local businesses.
                MyTsv ensures that all listed businesses go through a stringent
                vetting process to guarantee reliability and customer
                satisfaction. For service providers, MyTsv offers a platform
                where they can create and maintain their business listings,
                allowing them to update their profiles, respond to reviews, and
                showcase their services to a larger audience. While access to
                the directory is free for users, certain advanced features such
                as premium listings or additional visibility may require a paid
                membership. MyTsv is committed to upholding transparency by
                ensuring that service providers' profiles are accurate and that
                any updates or changes to business information are reflected
                promptly. User privacy and data security are at the forefront of
                MyTsv's priorities. The platform complies with GDPR and other
                relevant data protection regulations, safeguarding user
                information while maintaining a smooth and secure user
                experience. MyTsv also provides clear guidelines on how users
                can interact with the platform and service providers. However,
                it's important to note that MyTsv is not directly involved in
                the financial transactions, agreements, or the actual service
                delivery between users and service providers. It only
                facilitates the connection and provides reviews, ratings, and
                information to help users make informed decisions. The platform
                encourages users to submit honest, thoughtful reviews and
                feedback to help others in the community. Users are also
                encouraged to report any inappropriate content or reviews that
                violate the platform's content policies, ensuring a safe and
                trustworthy environment for all. MyTsv reserves the right to
                modify its terms and conditions, privacy policy, and other
                aspects of the platform at any time, with appropriate notice
                provided to users. Users can choose to modify or delete their
                accounts at any time, and MyTsv strives to resolve any disputes
                through a dedicated resolution process. The platform may offer
                special deals, discounts, or promotions in collaboration with
                service providers to enhance the user experience. By using the
                platform, users agree to abide by the terms and conditions
                outlined in this service agreement, ensuring a fair and
                transparent relationship between MyTsv, users, and service
                providers.MyTsv is a comprehensive platform that connects users
                with trusted local service providers through an extensive
                directory spanning multiple industries, including home
                improvement, legal services, financial planning, and more. It is
                designed to deliver a seamless user experience, enabling
                individuals to easily discover reliable, high-quality services
                through detailed business profiles and authentic user reviews.
                By offering transparent, accurate, and up-to-date information,
                MyTsv helps users make informed decisions and confidently choose
                service providers they can trust. All listed businesses undergo
                a rigorous vetting process to ensure credibility, reliability,
                and customer satisfaction. For service providers, MyTsv serves
                as a powerful visibility and management platform. Businesses can
                create and maintain their listings, update profile information,
                respond to customer reviews, and showcase their services to a
                broader audience. While the directory is free for users to
                access, certain enhanced features—such as premium listings or
                increased visibility—may be available through paid memberships.
                Transparency and accuracy are core principles of MyTsv. The
                platform ensures that business information remains current and
                that any updates or changes are reflected promptly. User privacy
                and data security are also top priorities; MyTsv complies with
                GDPR and other applicable data protection regulations to
                safeguard personal information and maintain a secure browsing
                experience. MyTsv provides clear guidelines governing user
                interactions and engagement with service providers. However, it
                does not participate in or oversee financial transactions,
                contractual agreements, or the delivery of services. Its role is
                limited to facilitating connections and providing reviews,
                ratings, and business information to support informed
                decision-making. The platform encourages users to submit honest,
                constructive feedback to benefit the wider community and
                promotes responsible reporting of any content that violates its
                policies. MyTsv reserves the right to update its terms and
                conditions, privacy policy, or platform features at any time,
                with appropriate notice to users. Users may modify or delete
                their accounts at their discretion, and MyTsv aims to address
                disputes through a dedicated resolution process. From time to
                time, the platform may also offer promotions, discounts, or
                special deals in collaboration with service providers. By using
                MyTsv, users agree to comply with the platform's terms and
                conditions, fostering a fair, transparent, and trustworthy
                ecosystem for users and service providers alike
              </div>
            </ScrollArea>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">
              Give your electronic signature here:
            </h5>
            <div className="bg-white rounded-xl w-80 h-30 grid place-items-center">
              <div>
                <FavIcon className="mx-auto" name="upload_contract" />
                <span className="text-grays mt-1">
                  Upload your signature here
                </span>
              </div>
            </div>
          </div>

          <Button className="rounded-full w-full" variant="primary">
            Pay now <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
