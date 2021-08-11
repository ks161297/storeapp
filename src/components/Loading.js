export default function Loading() {
    return (
        <div style ={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            zIndex: 99,
            backgroundColor:'white',
            
        }}>
            <i className="fas fa-spinner fa-spin fa-6x"
                style={{
                    color:'red',
                    position: 'absolute',
                    top:'calc(50% - 50px)',
                    left:'calc(50% - 50px)' 
                }}></i>
        </div>
    )
}
