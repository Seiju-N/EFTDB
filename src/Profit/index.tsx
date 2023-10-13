import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useHooks } from "./hooks";

export const Profit = () => {
  const { data, langDict } = useHooks();
  return (
    <Container sx={{ height: "100%" }}>
      <Box sx={{ height: "100%" }}>
        <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 18, py: 1 }}>
                  {langDict.PROFITS.item_name}
                </TableCell>
                <TableCell sx={{ fontSize: 18, py: 1 }}>
                  {langDict.PROFITS.sell_price}
                </TableCell>
                <TableCell sx={{ fontSize: 18, py: 1 }} align="right">
                  {langDict.PROFITS.profit}
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
                    <TableCell sx={{ py: 0, pl: 10 }} colSpan={3}>
                      <Box sx={{ margin: 1, pb: 2 }}>
                        <CurrencyExchangeIcon
                          fontSize="medium"
                          sx={{ verticalAlign: "middle", mr: 1 }}
                        />
                        <Table size="small" aria-label="purchases">
                          <colgroup>
                            <col style={{ width: "60%" }} />
                            <col style={{ width: "20%" }} />
                            <col style={{ width: "20%" }} />
                          </colgroup>
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
                                  ₽
                                  {buyItem.item.buyFor &&
                                    buyItem.item.buyFor[0]?.priceRUB}
                                  {" x "}
                                  {buyItem.count}
                                </TableCell>
                                <TableCell align="right">
                                  ₽
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
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={data.length === 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};
