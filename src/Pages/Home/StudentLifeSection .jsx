import React from "react";
import gameNight from "../../assets/Game Night.webp";
import festival from "../../assets/Cultural Festival.webp";
import birthdayWish from "../../assets/Birthday Bash.webp";

const events = [
  {
    title: "Game Night",
    img: gameNight,
    desc: "Weekly fun-filled game nights to unwind and socialize.",
  },
  {
    title: "Cultural Festival",
    img: festival,
    desc: "Annual celebration with music, dance, and food.",
  },
  {
    title: "Birthday Bash",
    img: birthdayWish,
    desc: "We celebrate every resident’s birthday with joy!",
  },
];

const StudentLifeSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Student Life & Events
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event, index) => (
            <div key={index} className="rounded-lg shadow-lg overflow-hidden">
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentLifeSection;
