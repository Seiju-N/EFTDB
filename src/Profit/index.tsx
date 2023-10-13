import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useHooks } from "./hooks";

export const Profit = () => {
  const { data } = useHooks();
  return (
    <Container>
      <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 18, py: 1 }}>
                <CurrencyExchangeIcon sx={{ verticalAlign: "middle" }} />
                Item
              </TableCell>
              <TableCell sx={{ fontSize: 18, py: 1 }}>Sell price</TableCell>
              <TableCell sx={{ fontSize: 18, py: 1 }} align="right">
                Profit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <>
                <TableRow
                  key={row.sellItem.item.id}
                  sx={{ "& > *": { borderBottom: "unset" } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "20px" }}
                  >
                    {row.sellItem.item.iconLink && (
                      <img
                        src={row.sellItem.item.iconLink}
                        alt={row.sellItem.item.name ?? ""}
                        style={{
                          height: "48px",
                          marginRight: "8px",
                          verticalAlign: "middle",
                        }}
                      />
                    )}
                    {row.sellItem.item.name}
                  </TableCell>
                  <TableCell style={{ fontSize: "20px" }}>
                    {row.sellVendor.name} ₽{row.sellItem.sellPrice}
                  </TableCell>
                  <TableCell align="right" style={{ fontSize: "20px" }}>
                    + ₽
                    {row.sellItem.sellPrice
                      ? row.sellItem.sellPrice - row.buyPrice
                      : 0}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={3}
                  >
                    <Box sx={{ margin: 1, pb: 2 }}>
                      <Typography variant="h6" gutterBottom component="div">
                        buy items
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableBody>
                          {row.buyItems.map((buyItem) => (
                            <TableRow key={buyItem.item.id}>
                              <TableCell component="th" scope="row">
                                {buyItem.item.iconLink && (
                                  <img
                                    src={buyItem.item.iconLink}
                                    alt={buyItem.item.name ?? ""}
                                    style={{
                                      height: "40px",
                                      marginRight: "8px",
                                      verticalAlign: "middle",
                                    }}
                                  />
                                )}
                                {buyItem.item.name}
                              </TableCell>
                              <TableCell align="right">
                                {buyItem.item.buyFor &&
                                  buyItem.item.buyFor[0]?.priceRUB}
                                x{buyItem.count}
                              </TableCell>
                              <TableCell align="right">
                                {buyItem.item.buyFor
                                  ? (buyItem.item.buyFor[0]?.priceRUB ?? 0) *
                                    buyItem.count
                                  : 0}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
