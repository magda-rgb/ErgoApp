interface PageLayoutProps {
  children: React.ReactNode
}

function PageLayout({ children }: PageLayoutProps): React.JSX.Element {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageLayout
