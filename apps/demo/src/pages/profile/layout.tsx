import { ChildRoutes } from 'react-baklava-router';

export default function Me() {
  return (
    <>
      <div className="with-sidebar">
        <aside>
          <h1>Hi, welcome!</h1>
        </aside>
        <main>
          <ChildRoutes />
        </main>
      </div>
    </>
  );
}
