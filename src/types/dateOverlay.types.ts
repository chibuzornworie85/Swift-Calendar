export interface Props {
  date: Date;
  position: { top: number; left: number; placement: "left" | "right" };
  onClose: () => void;
}
