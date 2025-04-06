import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const Contact = () => {
  const handleContactClick = () => {
    window.location.href = "mailto:jayzalani34@gmail.com?subject=Inquiry%20from%20Zentry%20Website";
  };

  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div 
        className="relative rounded-lg py-24 text-blue-50 sm:overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('img/Spiderman.jpg')" }}
      >
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join Fan Club!
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild Something <br /> <b>Amazing</b> <br /> t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full !text-5xl !font-black !leading-[.9]"
          />

          <Button 
            title="contact us" 
            containerClass="bg-blue-50 mt-10 cursor-pointer"
            onClick={handleContactClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
