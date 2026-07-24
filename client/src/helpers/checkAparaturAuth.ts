export const checkAparaturAuth = async () => {
  const storedToken = localStorage.getItem("local_token");
  if (!storedToken) return false;

  try {
    const response = await fetch(
      `http://${globalThis.location.hostname}:8000/aparatur/verifikasi`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${storedToken}` },
      },
    );

    if (!response.ok) {
      localStorage.removeItem("local_token");
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    localStorage.removeItem("local_token");
    return false;
  }
};
