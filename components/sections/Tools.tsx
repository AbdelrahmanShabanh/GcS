"use client";

// كومبوننت الشبكة الخاصة بالأدوات
export default function Tools() {
  const items = [
    { t: "تطوير تطبيقات الهاتف", i: "i-mobile" },
    { t: "الذكاء الاصطناعي", i: "i-ai" },
    { t: "برمجة ثلاثية الأبعاد", i: "i-3d" },
    { t: "تطوير الألعاب", i: "i-game" },
    { t: "Python وعلوم البيانات", i: "i-python" },
    { t: "Minecraft", i: "i-mc" },
    { t: "تطوير الويب", i: "i-web" },
    { t: "واجهة المستخدم (UI/UX)", i: "i-ui" },
  ];

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="section-title">+48 أداة تطوير برمجي في منهج واحد</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 bg-white rounded-3xl p-4 shadow-lg">
          {items.map((it) => (
            <div
              className="bg-primary-50 rounded-2xl text-center p-4"
              key={it.t}
            >
              <div
                className={`w-11 h-11 mx-auto mb-2 rounded-xl bg-white shadow-lg ${it.i}`}
              ></div>
              <div className="text-xs text-gray-700">{it.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
