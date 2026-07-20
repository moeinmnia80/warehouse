import Background from "@/assets/images/Background.webp";

export const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 opacity-dyn">
      <img
        src={Background}
        alt="background pattern"
        className="w-full h-full object-cover"
        fetchPriority="auto"
        decoding="auto"
      />
    </div>
  );
};
