import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 48,
    fontSize: 10,
    lineHeight: 1.5,
  },

  header: { marginBottom: 24 },

  name: {
    fontSize: 18,
    fontWeight: 600,
  },

  meta: {
    fontSize: 10,
    color: "#555",
    marginTop: 2,
  },

  section: {
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  divider: {
    height: 1,
    backgroundColor: "#bbb",
    marginVertical: 6,
  },

  entry: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 6,
  },

  entryLeft: {
    flex: 1,
  },

  entryTitle: {
    fontSize: 10,
    fontWeight: 600,
  },

  entryBody: {
    fontSize: 9.5,
    color: "#555",
    marginTop: 2,
  },

  entryRight: {
    fontSize: 9,
    color: "#777",
  },

  bullet: {
    fontSize: 9.5,
    color: "#555",
    marginLeft: 0,
    marginTop: 2,
    lineHeight: 1.4,
  },

  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },

  skillItem: {
    width: "50%",
    fontSize: 9.5,
    color: "#555",
    marginBottom: 2,
  },

  italic: {
    fontSize: 9.5,
    color: "#666",
  },

  bold: {
    fontWeight: 600,
  },
});
