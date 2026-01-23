import { useState } from 'react'

const faqs = [
    {
        question: "How many absences are allowed before I get dropped?",
        answer: "A student is dropped if absences reach 20% of the scheduled class hours."
    },
    {
        question: "Are educational tours or field trips mandatory?",
        answer: "No. Field trips are optional and cannot be used as a substitute for major examinations."
    },
    {
        question: "How do I apply for a Leave of Absence (LOA)?",
        answer: "You must file a written petition to your Dean. If it is for health reasons, it must be recommended by the University Physician."
    },
    {
        question: "What is the grade requirement to shift courses?",
        answer: "You generally need a GPA of at least 2.0 and must have no disciplinary record."
    }
]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="mx-auto max-w-3xl px-6 pb-24">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 mb-8 text-center">
                Frequently Asked Questions
            </h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="rounded-lg bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden cursor-pointer"
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="flex w-full items-start justify-between px-6 py-4 text-left">
                            <span className={`font-semibold ${openIndex === index ? 'text-primary' : 'text-gray-900'}`}>
                                {faq.question}
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                                {openIndex === index ? (
                                    <span key="minus" className="text-primary text-xl font-bold">−</span>
                                ) : (
                                    <span key="plus" className="text-gray-400 text-xl font-bold">+</span>
                                )}
                            </span>
                        </div>
                        {openIndex === index && (
                            <div className="px-6 pb-4 text-gray-600">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
