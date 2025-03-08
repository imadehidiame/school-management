export default function ModalOverlay({is_open}:{is_open:boolean}){
    if(!is_open)
        return null;
        return (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background
                zIndex: 999, // Ensure it's below the modal
                pointerEvents: 'none',
              }}
            />
          );
}