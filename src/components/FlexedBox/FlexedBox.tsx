import {Box} from "@mui/material";

interface FlexedBoxProps {
    styles?: {
        [key: string]: string
    }
}

export const FlexedBox: React.FC<FlexedBoxProps> = ({styles, children}) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" sx={styles}>
            {children}
        </Box>S
    )
}

export default FlexedBox;