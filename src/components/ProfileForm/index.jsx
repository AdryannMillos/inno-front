import { useState, useEffect, useContext } from "react";
import apiService from "../../services/apiService";
import AuthContext from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

function ProfileForm() {
  const { userData } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [authors, setAuthors] = useState("");
  const [sources, setSources] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    const fetchUserData = async () => {
      try {
        
        
        setEmail(userData.email);
        setName(userData.name);
        setAuthors(userData.preferences.authors || "");
        setSources(userData.preferences.sources || "");
      } catch (error) {
        setError("Error fetching user data");
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const updatedProfile = {
      name,
      email,
      preferences: {
        authors: authors,
        sources: sources,
      },
    };

    try {
      await apiService.put("/users/" + userData.id, updatedProfile);
      alert("Profile updated successfully");
    } catch (error) {
      setError("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Link className="redirect-to-register" to="/">
          Back to News Feed
        </Link>
        <h2>Profile</h2>

        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleUpdate}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            id="authors"
            name="authors"
            placeholder="Favorite authors separated by commas"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
          />
          <input
            type="text"
            id="sources"
            name="sources"
            placeholder="Favorite sources separated by commas"
            value={sources}
            onChange={(e) => setSources(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? <span>Loading...</span> : "Update profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
