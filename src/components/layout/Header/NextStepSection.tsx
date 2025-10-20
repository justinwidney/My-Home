// NextStepSection.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface NextStepSectionProps {
	text?: string;
	buttonText?: string;
	onButtonClick?: () => void;
}

export function NextStepSection({
	text = "Ready to continue?",
	buttonText = "Next Step",
	onButtonClick,
}: NextStepSectionProps): JSX.Element {
	return (
		<>
			<span className="text-sm text-muted-foreground whitespace-nowrap">
				{text}
			</span>
			<Button className="gap-1" size="sm" onClick={onButtonClick}>
				{buttonText}
				<ArrowRight size={14} />
			</Button>
		</>
	);
}
