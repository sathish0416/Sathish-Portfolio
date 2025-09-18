import React from "react"
import { Box, Typography, Button } from "@mui/material"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

const Certificate = ({ ImgSertif, Title, Issuer, Date, Type }) => {
	const handleOpen = () => {
		window.open(ImgSertif, '_blank')
	}

	return (
		<Box component="div" sx={{ width: "100%", height: "100%" }}>
			<Box
				className=""
				sx={{
					minHeight: "250px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					position: "relative",
					overflow: "hidden",
					borderRadius: 2,
					boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					backgroundColor: "rgba(105, 102, 135, 0.33)",
					"&:hover": {
						transform: "translateY(-5px)",
						boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
						backgroundColor: "rgba(35, 30, 88, 0.4)",
					},
					padding: 3,
				}}>
				<Box sx={{ textAlign: "left", color: "white" }}>
					<Typography
						variant="h6"
						sx={{
							fontWeight: 600,
							mb: 2,
							fontSize: "1.2rem",
							color: "#6366f1",
						}}>
						{Title}
					</Typography>
					<Typography
						variant="body1"
						sx={{
							color: "#ecf0f1",
							mb: 1,
							fontWeight: 500,
						}}>
						{Issuer}
					</Typography>
					<Typography
						variant="body2"
						sx={{
							color: "#bdc3c7",
							mb: 2,
						}}>
						{Date}
					</Typography>
					<Button
						variant="text"
						startIcon={<OpenInNewIcon />}
						onClick={handleOpen}
						sx={{
							color: "#6366f1",
							padding: 0,
							textTransform: "none",
							"&:hover": {
								color: "#4f46e5",
								backgroundColor: "transparent",
							},
						}}>
						View Certificate
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

export default Certificate
