import {
  BorderFatCenter,
  BorderLeft,
  BorderRight,
} from "@/components/ui/borders";

function HeroBorder({ bottomSquare = false }: { bottomSquare?: boolean }) {
  return (
    <div>
      <BorderLeft className="max-md:hidden" square={bottomSquare} />
      <BorderFatCenter className="max-md:hidden" square={bottomSquare} />
      <BorderRight className="max-md:hidden" square={bottomSquare} />
    </div>
  );
}

export default HeroBorder;
