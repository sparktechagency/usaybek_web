import SectionNav from "@/components/reuseable/section-nav";
import { Card } from "@/components/ui";
import { Seo } from "@/lib";
import { termsApi } from "@/redux/api/landing/termsApi";
import { makeStore } from "@/redux/store";
import { Metadata } from "next";

export const metadata: Metadata = Seo({
  title: "Terms & Conditions | MyTsv",
  description:
    "Welcome to mytsv.com. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using the site",
  keywords: [
    "Terms & Conditions",
    "MyTsv Terms",
    "MyTsv Conditions",
    "MyTsv policy",
    "terms and conditions MyTsv",
  ],
  url: `/terms`,
  image: "/images/tarams.svg",
});

export default async function Terms() {
  const store = makeStore();
  const { data: terms } = await store.dispatch(
    termsApi.endpoints.getTerms.initiate({ type: "Terms" })
  );

  return (
    <div className="m-auto lg:px-28">
      <SectionNav
        src="/images/tarams.svg"
        className="mb-4"
        title="Terms & Conditions"
      />
      <h1 className="font-medium text-lg text-center w-11/12 lg:max-w-5xl mx-auto mb-10">
        Welcome to mytsv.com. By accessing or using our website, you agree to
        comply with and be bound by the following terms and conditions. Please
        read them carefully before using the site
      </h1>
      <Card>
        <div className="space-y-5">
          {terms?.data?.map((term: any) => (
            <div key={term.id} className="space-y-1">
              <div dangerouslySetInnerHTML={{ __html: term.text }}></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
