import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { getAllSections } from "./config/navigation";

function App() {
  const allSections = getAllSections();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Navigate to={"/settings/org/integrations"} replace />}
          />

          {allSections.map((section) => (
            <Route key={section.path} path={section.path.substring(1)}>
              <Route
                index
                element={
                  section.component ? (
                    <section.component />
                  ) : section.subItems && section.subItems.length > 0 ? (
                    <Navigate to={section.subItems[0].path} replace />
                  ) : (
                    <div className="p-8">
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {section.name}
                      </h1>
                      <p className="text-gray-600">
                        {section.name} page content will be displayed here.
                      </p>
                    </div>
                  )
                }
              />
              {section.subItems?.map((subItem) => {
                return (
                  <Route
                    key={subItem.path}
                    path={subItem.path.replace(section.path + "/", "")}
                    element={
                      subItem.element || (
                        <div className="p-8">
                          <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {subItem.name}
                          </h1>
                          <p className="text-gray-600">
                            {section.name} - {subItem.name} page content will be
                            displayed here.
                          </p>
                        </div>
                      )
                    }
                  />
                );
              })}
            </Route>
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
