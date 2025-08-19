import { Card } from "@/components/ui/card";

interface VideoEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

const VideoEmbed = ({ videoId, title, className = "" }: VideoEmbedProps) => {
  return (
    <Card className={`overflow-hidden shadow-strong ${className}`}>
      <div className="relative">
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Card>
  );
};

export default VideoEmbed;