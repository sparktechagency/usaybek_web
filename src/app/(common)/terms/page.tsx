import assets from '@/assets'
import SectionNav from '@/components/reuseable/section-nav'
import { Card } from '@/components/ui'
import React from 'react'


const terms = [
  {
    id: 1,
    title: "Acceptance of Terms",
    content:
      "By accessing or using mytsv.com, you agree to be legally bound by these Terms and Conditions, our Privacy Policy, and any other policies we post. If you do not agree with any part of these terms, please do not use our website.",
  },
  {
    id: 2,
    title: "Use of the Website",
    content:
      "You agree to use mytsv.com only for lawful purposes and in a way that does not infringe on the rights of, restrict, or inhibit anyone else's use of the website. You must not misuse the site by introducing viruses, attempting unauthorized access, or engaging in any activity that harms our platform or users.",
  },
  {
    id: 3,
    title: "User Accounts",
    content:
      "If you create an account with us, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
  },
  {
    id: 4,
    title: "Intellectual Property",
    content:
      "All content on mytsv.com, including text, graphics, logos, images, and software, is the property of MyTSV or its content suppliers and is protected by copyright, trademark, and other laws. You may not copy, distribute, or use our content without our prior written consent.",
  },
  {
    id: 5,
    title: "User-Generated Content",
    content:
      "If you post or submit content (text, images, etc.) to the site, you grant MyTSV a non-exclusive, royalty-free, worldwide license to use, display, and distribute your content. You must own the rights to any content you submit and agree not to post anything unlawful, offensive, or misleading.",
  },
  {
    id: 6,
    title: "Third-Party Links",
    content:
      "Our website may contain links to third-party sites. We are not responsible for the content, accuracy, or privacy practices of those sites. Access them at your own risk.",
  },
  {
    id: 7,
    title: "Limitation of Liability",
    content:
      'MyTSV is not liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to use our website or services. All content is provided "as is" without warranties of any kind.',
  },
  {
    id: 8,
    title: "Modifications to Terms",
    content:
      "We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with a revised date. Your continued use of the site after such changes indicates your acceptance of the new terms.",
  },
  {
    id: 9,
    title: "Termination",
    content:
      "We may suspend or terminate your access to mytsv.com without notice if we believe you have violated these Terms or engaged in harmful conduct.",
  },
  {
    id: 10,
    title: "Governing Law",
    content:
      "These Terms and Conditions are governed by and interpreted in accordance with the laws of the State of Illinois, United States.",
  },
]

export default function Terms() {
  return (
    <div className="m-auto lg:px-28">
      <SectionNav src={assets.basic.tarams} title="Terms & Conditions" />
      <Card>
        <div className="space-y-5">
          {terms.map((term) => (
            <div key={term.id} className="space-y-1">
              <h2 className="text-lg font-bold text-blacks">
                {term.id}. {term.title}
              </h2>
              <p className="text-blacks">{term.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
