import {Box} from "@mui/material";

interface FlexedBoxProps {
    styles?: {
        [key: string]: string | number;
    }
}

export const FlexedBox: React.FC<FlexedBoxProps> = ({styles, children}) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" sx={styles}>
            {children}
        </Box>
    )
}

export default FlexedBox;