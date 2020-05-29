export default (x, y) => {
  if (x.pinned < y.pinned) return 1;
  else if (x.pinned > y.pinned) return -1;
  else return new Date(y.created_at) - new Date(x.created_at);
};
