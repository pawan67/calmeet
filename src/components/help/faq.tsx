import * as Craft from "@/components/ui/craft";

import { ArrowUpRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  question: string;
  answer: string;
  link?: string;
};

const content: FAQItem[] = [
  {
    question: "What is Calmeet?",
    answer:
      "Calmeet is a web application that simplifies event scheduling by allowing you to create, manage, and view bookings efficiently.",
  },
  {
    question: "Who can use Calmeet?",
    answer:
      "Calmeet is ideal for individuals, teams, and organizations who want to streamline their event scheduling process.",
  },
  {
    question: "Is Calmeet free to use?",
    answer:
      "We offer both free and paid plans. The free plan provides core functionalities, while paid plans offer additional features like attendee management and integrations.",
  },
  {
    question: "How do I create a booking?",
    answer:
      "Simply create an account and log in. You can then define the event details (title, description, date, time, event type) and create the booking.",
  },
  {
    question: "Can I manage existing bookings?",
    answer: "Yes, you can view, edit, or delete your bookings at any time.",
  },
  {
    question: "Can I invite attendees to my bookings?",
    answer:
      "(Optional, depending on your implementation) Currently, Calmeet doesn't support direct attendee invites. However, you can share the booking details with your attendees.",
  },
  {
    question: "Is my data secure with Calmeet?",
    answer:
      "Yes, we take security seriously. We use secure protocols to store your data and protect it from unauthorized access.",
  },
  {
    question: "How does Calmeet handle my privacy?",
    answer:
      "We are committed to protecting your privacy. We only collect and use data necessary for the functionality of Calmeet, and we will never share your information with third parties without your consent.",
  },
  {
    question: "What devices can I use Calmeet on?",
    answer:
      "Calmeet is currently a web application accessible through most web browsers. We are exploring mobile app development in the future.",
  },
  {
    question: "Do I need to download any software to use Calmeet?",
    answer:
      "No, Calmeet is a web-based application, so no downloads are required.",
  },
  {
    question: "What are the benefits of using Calmeet?",
    answer:
      "Calmeet saves you time and effort by streamlining the event scheduling process. It improves organization, reduces miscommunication, and boosts overall productivity.",
  },
  {
    question: "What are Calmeet's future plans?",
    answer:
      "We are constantly working on improving Calmeet. We plan to implement features like attendee management, calendar integrations, and video conferencing capabilities.",
  },
  {
    question:
      "For any further questions, please don't hesitate to contact our support team.",
    answer: "",
    link: "mailto:calmeet.care@gmail.com",
  },
];

const FAQ = () => {
  return (
    <Craft.Section>
      <Craft.Container>
        <h3 className="!mt-0">Frequently Asked Questions</h3>
        <h4 className="text-muted-foreground">
          Can&apos;t find the answer you&apos;re looking for? Reach out to our
          customer support team.
        </h4>
        <div className="mt-4 md:mt-8 not-prose flex flex-col gap-4">
          {content.map((item, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem
                value={item.question}
                className="hover:bg-muted/50 transition-all border px-4 bg-muted/20 rounded-md"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base md:w-3/4">
                  {item.answer}
                  {item.link && (
                    <a
                      href={item.link}
                      className="opacity-60 w-full mt-2 hover:opacity-100 transition-all flex items-center"
                    >
                      Learn more <ArrowUpRight className="ml-1" size="16" />
                    </a>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </Craft.Container>
    </Craft.Section>
  );
};

export default FAQ;
