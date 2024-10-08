import logo from '../src/assets/Logo.png'; 

function Home() {
    // Inline styles
    const styles = {
        body: {
            margin: 0,
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f8f9fa', // Light background
            color: '#343a40', // Dark text color
        },
        root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        },
        header: {
            backgroundColor: '#63BFF4', // Bright blue header
            color: 'white',
            textAlign: 'center',
            padding: '2rem 0',
        },
        logo: {
            width: '150px', // Adjust logo size
            marginBottom: '1rem',
        },
        mainContent: {
            flex: 1,
            padding: '2rem',
            textAlign: 'center', // Center-align text
        },
        h2: {
            margin: '1rem 0',
            fontSize: '2rem', // Increase size for emphasis
        },
        p: {
            fontSize: '1.1rem',
            lineHeight: 1.6, // Improve readability
            maxWidth: '600px', // Limit paragraph width
            margin: '0 auto 2rem', // Center-align and space out
        },
        ctaButton: {
            backgroundColor: '#E949DB', // Vivid pink for the button
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease', // Smooth transition
        },
        ctaButtonHover: {
            backgroundColor: '#d738b8', // Darker shade on hover
        },
        footer: {
            backgroundColor: '#343a40', // Dark footer
            color: 'white',
            textAlign: 'center',
            padding: '1rem 0',
        },
        footerLink: {
            color: '#63BFF4', // Link color matching the header
            textDecoration: 'none', // Remove underline
        },
        footerLinkHover: {
            textDecoration: 'underline', // Underline on hover
        },
    };

    return (
        <div style={styles.root}>
            <header style={styles.header}>
                <img src={logo} alt="Ruix Logo" style={styles.logo} />
                <h1>Welcome to Ruix!</h1>
            </header>

            <main style={styles.mainContent}>
                <br />
                <h2 style={styles.h2}>Your Go-To Platform for Everything!</h2>
                <br />
                <p style={styles.p}>
                    At Ruix, we provide top-notch services and solutions to help you achieve your goals. 
                    Whether you are looking for tech support, development services, or just exploring new ideas, 
                    you have come to the right place.
                </p>
                <button 
                    style={styles.ctaButton} 
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.ctaButtonHover.backgroundColor} 
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.ctaButton.backgroundColor}
                >
                    Get Started
                </button>
            </main>

            <footer style={styles.footer}>
                <p>&copy; 2024 Ruix. All rights reserved.</p>
                <p>
                    Follow us on 
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.footerLink}> Twitter</a>, 
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.footerLink}> Facebook</a>, 
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.footerLink}> Instagram</a>.
                </p>
            </footer>
        </div>
    );
}

export default Home;
