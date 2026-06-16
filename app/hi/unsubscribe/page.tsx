import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";

export const metadata: Metadata = {
  title: "सदस्यता समाप्त करें",
  description: "RKM फाउंडेशन ईमेल अपडेट से सदस्यता समाप्त करें।",
  alternates: { canonical: "/hi/unsubscribe" },
};

export default function UnsubscribeHiPage() {
  return (
    <section className="bg-snow pb-24 pt-32 sm:pt-40" lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <div className="container-c max-w-xl">
        <Reveal>
          <div className="text-center">
            <h1 className="display-2 text-balance">ईमेल अपडेट से सदस्यता समाप्त करें।</h1>
            <p className="mt-4 leading-relaxed text-ink/70">
              हमें आपके जाने का दुख है। यदि आप अब RKM फाउंडेशन से ईमेल नहीं पाना चाहते, तो आप नीचे सदस्यता समाप्त कर सकते हैं।
            </p>
          </div>
          <div className="mt-8">
            <FormShell
              formType="unsubscribe"
              fields={[
                { name: "email", label: "ईमेल पता", type: "email", required: true, placeholder: "अपना ईमेल पता लिखें" },
              ]}
              submitLabel="ईमेल से सदस्यता समाप्त करें"
              successMessage="आपकी सदस्यता समाप्त कर दी गई है। आपने हमारे साथ जो समय बिताया उसके लिए हम आभारी हैं।"
            />
          </div>
          <p className="mt-6 text-center text-xs leading-relaxed text-ink/60">
            दान, रसीद, या आपके द्वारा शुरू किए गए अनुरोधों से संबंधित ज़रूरी लेन-देन संबंधी ईमेल आवश्यकता पड़ने पर फिर भी भेजे जा सकते हैं। यदि यह गलती से हुआ, तो आप वेबसाइट के ज़रिए कभी भी दोबारा सदस्यता ले सकते हैं।
          </p>
        </Reveal>
      </div>
    </section>
  );
}
