import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();

  const faqs = [
    { question: t('faq.questions.quality.question'), answer: t('faq.questions.quality.answer') },
    { question: t('faq.questions.warranty.question'), answer: t('faq.questions.warranty.answer') },
    { question: t('faq.questions.financing.question'), answer: t('faq.questions.financing.answer') },
    { question: t('faq.questions.delivery.question'), answer: t('faq.questions.delivery.answer') },
    { question: t('faq.questions.trade_in.question'), answer: t('faq.questions.trade_in.answer') },
    { question: t('faq.questions.test_drive.question'), answer: t('faq.questions.test_drive.answer') },
    { question: t('faq.questions.reserve.question'), answer: t('faq.questions.reserve.answer') },
    { question: t('faq.questions.schedule.question'), answer: t('faq.questions.schedule.answer') },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('faq.subtitle')}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-[15px] font-semibold text-foreground hover:text-primary py-5 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
